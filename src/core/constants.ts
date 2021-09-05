export const DATA_MARKER_ID = 'data-c-l-i';
export const DATA_MARKER_DESCRIPTION = 'aria-label';

export enum ActionType {
  Wait = 'wait',
  NewContext = 'new_context',
  NewPage = 'new_page',
  CloseContext = 'close_context',
  ClosePage = 'close_page',
  Click = 'click',
  VisibilityAssertion = 'visibility_assertion',
  TextContentAssertion = 'text_content_assertion',
}

export enum FailBehavior {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
}
