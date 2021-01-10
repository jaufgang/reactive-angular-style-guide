import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';
import { IStyleGuideFields } from '../../@types/generated/contentful';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  });
  constructor() {}

  getStyleGuides(query?: object): Observable<Array<Entry<IStyleGuideFields>>> {
    return from(
      this.client.getEntries<IStyleGuideFields>({
        content_type: 'styleGuide',
        include: 10,
        ...query,
      })
    ).pipe(
      map((res) => {
        return res.items;
      })
    );
  }
}
