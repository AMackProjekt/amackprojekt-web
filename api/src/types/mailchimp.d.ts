declare module '@mailchimp/mailchimp_marketing' {
  export interface Config {
    apiKey?: string;
    accessToken?: string;
    server?: string;
  }

  export interface MergeFields {
    [key: string]: string;
  }

  export interface ListMember {
    email_address: string;
    status_if_new?: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
    status?: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
    merge_fields?: MergeFields;
    tags?: string[];
    id?: string;
  }

  export interface Lists {
    setListMember(
      listId: string,
      subscriberHash: string,
      body: ListMember
    ): Promise<ListMember>;
    getListMember(listId: string, subscriberHash: string): Promise<ListMember>;
  }

  interface MailchimpClient {
    setConfig(config: Config): void;
    lists: Lists;
  }

  const client: MailchimpClient;
  export default client;
}
