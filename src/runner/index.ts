import Debug from 'debug';
import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { EventEmitter } from 'events';
import { Action, ActionType, ContextId, FailBehavior, PageId } from '../core';

const debug = Debug('t6:runner');

class Runner extends EventEmitter {
  browser: Browser | undefined;
  contexts: Record<
    ContextId,
    { context: BrowserContext; pages: Record<PageId, Page> }
  > = {};

  constructor() {
    super();
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 初始化本次运行
   */
  private async setup() {
    if (this.browser) return;
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
    });
  }

  /**
   * 一次运行完成后清理工作
   */
  private async cleanup() {
    await this.browser.close();
    this.contexts = {};
  }

  /**
   * 获取指定 ID 的 Context 对象
   */
  private getContext(id: ContextId): {
    context: BrowserContext;
    pages: Record<PageId, Page>;
  } {
    const context = this.contexts[id];
    if (!context) throw new Error(`Context(${id}) not found.`);
    return context;
  }

  /**
   * 获取制定 ID 的 Page
   */
  private getPage(ctxId: ContextId, pageId: PageId): Page {
    const context = this.getContext(ctxId);
    const page = context.pages[pageId];
    if (!page) throw new Error(`Page(${pageId}) not found.`);
    return page;
  }

  /**
   * 执行每一个 Action
   */
  private async runEach(action: Action) {
    if (!this.browser) return;
    switch (action.action) {
      case ActionType.Wait:
        await this.sleep(action.params.ms);
        break;
      case ActionType.NewContext:
        {
          const {
            params: { id },
          } = action;
          const context = await this.browser.newContext();
          this.contexts[id] = {
            context,
            pages: {},
          };
        }
        break;
      case ActionType.NewPage:
        {
          const {
            context: ctxId,
            params: { id: pageId, url },
          } = action;
          const context = this.getContext(ctxId);
          const page = await context.context.newPage();
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          context.pages[pageId] = page;
        }
        break;
      case ActionType.CloseContext:
        {
          const { context: id } = action;
          const context = this.getContext(id);
          await context.context.close();
        }
        break;
      case ActionType.ClosePage:
        {
          const { context: ctxId, page: pageId } = action;
          const page = this.getPage(ctxId, pageId);
          await page.close();
        }
        break;
      case ActionType.Click:
        {
          const {
            context: ctxId,
            page: pageId,
            params: { selector },
          } = action;
          const page = this.getPage(ctxId, pageId);
          await page.click(selector);
        }
        break;
      case ActionType.VisibilityAssertion:
        {
          const {
            context: ctxId,
            page: pageId,
            params: { selector },
          } = action;
          const page = this.getPage(ctxId, pageId);
          await page.waitForSelector(selector, {
            timeout: 300000,
            state: 'visible',
          });
        }
        break;
      case ActionType.TextContentAssertion:
        {
          const {
            context: ctxId,
            page: pageId,
            params: { selector, value },
          } = action;
          const page = this.getPage(ctxId, pageId);
          const textContent = await page.textContent(selector);
          if (value !== textContent)
            throw new Error('TextContent Assertion Failed');
        }
        break;
      default:
        debug(`Action: ${action} not implemented`);
    }
  }

  /**
   * 执行传入的 actions
   */
  async run(actions: Action[]): Promise<void> {
    try {
      await this.setup();
      for (const action of actions) {
        try {
          await this.runEach(action);
        } catch (err) {
          const { whenFails = FailBehavior.Fatal } = action;
          if (whenFails === FailBehavior.Fatal) throw err;
        }
      }
    } finally {
      await this.cleanup();
    }
  }
}

export { Runner };
