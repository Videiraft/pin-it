import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Link } from '../../models/link';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.css']
})
export class LinksListComponent implements OnInit, OnChanges {

  @Input()
  links: Link[];

  @Input()
  type: string;

  @Input()
  tags: string[] = [];

  filteredLinks: Link[];

  ngOnInit () {
    this.filterLinks(this.tags)
  }

  ngOnChanges () {
    this.filterLinks(this.tags)
  }

  filterLinks (tags: string[]) {
    if (tags.length < 1) this.resetLinks();
    else if (this.links) {
      this.filteredLinks = this.links.filter((link) => {
        for (let i = 0; i < this.tags.length; i++) {
          if (link.tags.includes(this.tags[i])) return true;
        }
      });
    }
  }

  resetLinks () {
    this.filteredLinks = this.links;
  }
}
