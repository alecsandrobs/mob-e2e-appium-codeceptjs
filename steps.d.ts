/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type AssertWrapper = import('codeceptjs-assert');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Appium, AssertWrapper {}
  interface I extends ReturnType<steps_file>, WithTranslation<AssertWrapper> {}
  namespace Translation {
    interface Actions {}
  }
}
