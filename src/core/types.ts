import { ActionType, FailBehavior } from '.';

export type ContextId = string;

export type PageId = string;

export type Selector = string;

export interface NewContext extends BaseAction {
  action: ActionType.NewContext;
  params: {
    id: ContextId;
  };
}

export interface NewPage extends BaseAction {
  context: ContextId;
  action: ActionType.NewPage;
  params: {
    url: string;
    id: PageId;
  };
}

export interface BaseAction {
  context?: ContextId;
  page?: PageId;
  action: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  whenFails?: FailBehavior;
}

export interface NewContext extends BaseAction {
  action: ActionType.NewContext;
  params: {
    id: ContextId;
  };
}

export interface NewPage extends BaseAction {
  context: ContextId;
  action: ActionType.NewPage;
  params: {
    url: string;
    id: PageId;
  };
}

export interface CloseContext extends BaseAction {
  context: ContextId;
  action: ActionType.CloseContext;
}

export interface ClosePage extends BaseAction {
  context: ContextId;
  page: PageId;
  action: ActionType.ClosePage;
}

export interface Wait extends BaseAction {
  action: ActionType.Wait;
  params: {
    ms: number;
  };
}

export interface Click extends BaseAction {
  context: ContextId;
  page: PageId;
  action: ActionType.Click;
  params: {
    selector: Selector;
  };
}

export interface VisibilityAssertion extends BaseAction {
  context: ContextId;
  page: PageId;
  action: ActionType.VisibilityAssertion;
  params: {
    selector: Selector;
  };
}

export interface TextContentAssertion extends BaseAction {
  context: ContextId;
  page: PageId;
  action: ActionType.TextContentAssertion;
  params: {
    selector: Selector;
    value: string;
  };
}

export type Action =
  | Wait
  | NewContext
  | NewPage
  | CloseContext
  | ClosePage
  | Click
  | VisibilityAssertion
  | TextContentAssertion;
