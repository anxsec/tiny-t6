import path from 'path';
import { EventEmitter } from 'events';
import { chromium, BrowserContext, Page, Browser } from 'playwright';
import { ActionType, BaseAction } from '../core';

/**
 * 录制器
 */
class Recorder extends EventEmitter {
  /**
   * 浏览器实例
   */
  browser: Browser;
  /**
   * 上下文
   */
  contextId = '';

  /**
   * 添加一个动作
   * @param action
   */
  private addAction(action: BaseAction) {
    this.emit('addAction', action);
  }

  /**
   * 生成一个唯一标识
   * @returns uid
   */
  static getUid(): string {
    return `${Math.floor(Math.random() * 100000)}`;
  }

  /**
   * 初始化浏览器上下文
   * @param context
   */
  private initContext(context: BrowserContext) {
    this.contextId = Recorder.getUid();
    this.addAction({
      context: this.contextId,
      action: ActionType.NewContext,
      params: {
        id: this.contextId,
      },
    });
    context.on('close', () => {
      this.addAction({ context: this.contextId, action: ActionType.CloseContext });
      this.emit('recordEnd');
    });
  }

  /**
   * 初始化注入脚本
   * @param context
   */
  private async initScript(context: BrowserContext) {
    await context.exposeBinding(
      '_addTestSuccessAction',
      (_source, actionDescription: string) => {
        const actionRecord = JSON.parse(actionDescription);
        this.addAction(actionRecord);
      }
    );
    await context.exposeBinding(
      '_closeTestSuccessAction',
      () => {
        this.browser.close();
      }
    );
    await context.addInitScript({
      path: path.join(__dirname, './injected/index.js'),
    });
  }

  /**
   * 设置页面上下文和页面信息启动脚本
   * @param page
   * @param pageId
   */
  private async setContextAndPageID(page: Page, pageId: string) {
    await page.evaluate(`window.__test_success_context_id = ${this.contextId}`);
    await page.evaluate(`window.__test_success_page_id = ${pageId}`);
    await page.evaluate(`window.__test_success_bootstrap()`);
  }

  /**
   * 初始化页面
   * @param context
   * @param url
   */
  private async initPage(context: BrowserContext, url: string) {
    const pageId = Recorder.getUid();
    const page = await context.newPage();
    page.on('domcontentloaded', () => {
      this.setContextAndPageID(page, pageId);
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    this.addAction({
      context: this.contextId,
      page: pageId,
      action: ActionType.NewPage,
      params: {
        url,
        id: pageId,
      },
    })
  }

  /**
   * 启动
   * @param url
   * @returns start
   */
  public async start(url: string): Promise<void> {
    this.browser = await chromium.launch({ headless: false });
    const context: BrowserContext = await this.browser.newContext();
    this.initContext(context);
    await this.initScript(context);
    await this.initPage(context, url);
  }

  /**
   * 停止
   * @returns stop
   */
  public async stop(): Promise<boolean> {
    await this.browser.close();
    return true;
  }
}

export { Recorder };
