import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';
import { animate, style, transition, trigger } from '@angular/animations';

export type MenuItem = {
  icon: string;
  label: string;
  route?: any;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  animations: [
    trigger('expandContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate( '250ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ],
  imports: [
    MatSidenavModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(public sidenavService: SidenavService) {}

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'video_library',
      label: 'Content',
      route: 'content',
      subItems: [
        {
          icon: 'play_circle',
          label: 'Videos',
          route: 'videos',
        },
        {
          icon: 'playlist_play',
          label: 'Playlists',
          route: 'playlists',
        },
        {
          icon: 'post_add',
          label: 'Posts',
          route: 'posts',
        },
      ],
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    },
    {
      icon: 'comments',
      label: 'Comments',
      route: 'comments',
    },
  ]);


  sidenavWidth = computed(() => this.sidenavService.sidenavWidth);
  profilePicSize = computed(() => this.sidenavService.profilPicWidth);
  isCollapsed = computed(() => this.sidenavService.collapsed());


  nestedMenuOpenIndex = signal<number | null>(null);

  isNestedMenuOpen(index: number): boolean {
    return this.nestedMenuOpenIndex() === index;
  }

  toggleNested(index: number): void {
    this.nestedMenuOpenIndex() === index ? this.nestedMenuOpenIndex.set(null) : this.nestedMenuOpenIndex.set(index);
  }
}
