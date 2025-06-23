import { BrowserContext, Page, Cookie, APIRequestContext, request } from '@playwright/test';

export class BaseContext {
  protected context: BrowserContext;
  protected apiContext: APIRequestContext;

  constructor(context: BrowserContext) {
    this.context = context;
  }

  async newPage(): Promise<Page> {
    return await this.context.newPage();
  }
  

  async close(): Promise<void> {
    await this.context.close();
    await this.apiContext.dispose();
  }

  async setCookies(cookies: Cookie[]): Promise<void> {
    await this.context.addCookies(cookies);
  }

  async clearCookies(): Promise<void> {
    await this.context.clearCookies();
  }

  async getPages(): Promise<Page[]> {
    return this.context.pages();
  }

  async get(url: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<any> {
    const response = await this.apiContext.get(url, options);
    return await response.json();
  }

  async post(url: string, data: any, options?: Parameters<APIRequestContext['post']>[1]): Promise<any> {
    const response = await this.apiContext.post(url, { data, ...options });
    return await response.json();
  }

  async put(url: string, data: any, options?: Parameters<APIRequestContext['put']>[1]): Promise<any> {
    const response = await this.apiContext.put(url, { data, ...options });
    return await response.json();
  }

  async delete(url: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<any> {
    const response = await this.apiContext.delete(url, options);
    return await response.json();
  }

  async waitForNetworkIdle(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
  }

  async initApiContext(options?: Parameters<typeof request.newContext>[0]) {
    this.apiContext = await request.newContext(options);
  }
} 