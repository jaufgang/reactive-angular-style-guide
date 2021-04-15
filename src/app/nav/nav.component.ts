import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  menu: any[] = [];
  filteredMenu: any[] = [];
  @Input() set styleGuides(data: any) {
    data.forEach((mainSection: any, index: number) => {
      this.menu.push({ title: mainSection.title, level: 1, id: index });
      mainSection.sections.forEach((subSection: any, subIndex: number) => {
        this.menu.push({
          title: subSection.title,
          level: 2,
          id: `${index}-${subIndex}`,
        });
        if (subSection.rules) {
          subSection.rules.forEach((rule: any, ruleIndex: number) => {
            this.menu.push({
              title: rule.title,
              level: 3,
              id: `${index}-${subIndex}-${ruleIndex}`,
            });
          });
        }
      });
    });
    this.filteredMenu = this.menu;
  }

  scrollToElement(item: any) {
    document.getElementById(item.id)?.scrollIntoView();
  }

  filterMenu(item: any) {
    this.filteredMenu = this.menu.filter(menuItem =>
      menuItem.title.toLowerCase().includes(item.toLowerCase()),
    );
  }
}
