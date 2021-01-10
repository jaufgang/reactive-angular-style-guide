import {
  ICodeSample,
  IMultiFileCodeSample,
  IRule,
  IStyleGuide,
  IStyleGuideSection,
} from '../../@types/generated/contentful';
import { TypeGuard } from './guard-type.pipe';

export type ContentfulEntry = ICodeSample | IMultiFileCodeSample | IRule | IStyleGuide | IStyleGuideSection;

export const isCodeSample: TypeGuard<ContentfulEntry, ICodeSample> = (entry: ContentfulEntry): entry is ICodeSample =>
  entry.sys.contentType.sys.id === 'codeSample';

export const isMultiFileCodeSample: TypeGuard<ContentfulEntry, IMultiFileCodeSample> = (
  entry: ContentfulEntry
): entry is IMultiFileCodeSample => entry.sys.contentType.sys.id === 'multiFileCodeSample';
