// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface ICodeSampleFields {
  /** fileName */
  fileName: string;

  /** avoid */
  avoid?: boolean | undefined;

  /** Code */
  code?: string | undefined;
}

export interface ICodeSample extends Entry<ICodeSampleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'codeSample';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IMultiFileCodeSampleFields {
  /** Code Sample File */
  codeSampleFile?: ICodeSample[] | undefined;

  /** Title */
  title: string;
}

export interface IMultiFileCodeSample
  extends Entry<IMultiFileCodeSampleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'multiFileCodeSample';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IRuleFields {
  /** Title */
  title?: string | undefined;

  /** Do */
  do?: string[] | undefined;

  /** Consider */
  consider?: string[] | undefined;

  /** Avoid */
  avoid?: string[] | undefined;

  /** Why */
  why?: string[] | undefined;

  /** Discussion */
  discussion?: Document | undefined;

  /** Code Samples */
  codeSamples?: (ICodeSample | IMultiFileCodeSample)[] | undefined;

  /** Sidebar */
  sidebar?: string | undefined;
}

export interface IRule extends Entry<IRuleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'rule';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IStyleGuideFields {
  /** Title */
  title: string;

  /** Discussion */
  discussion?: Document | undefined;

  /** Sections */
  sections?: IStyleGuideSection[] | undefined;
}

export interface IStyleGuide extends Entry<IStyleGuideFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'styleGuide';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IStyleGuideSectionFields {
  /** Title */
  title: string;

  /** Discussion */
  discussion?: Document | undefined;

  /** Rules */
  rules?: IRule[] | undefined;
}

export interface IStyleGuideSection extends Entry<IStyleGuideSectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'styleGuideSection';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export type CONTENT_TYPE =
  | 'codeSample'
  | 'multiFileCodeSample'
  | 'rule'
  | 'styleGuide'
  | 'styleGuideSection';

export type LOCALE_CODE = 'en-US';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US';
