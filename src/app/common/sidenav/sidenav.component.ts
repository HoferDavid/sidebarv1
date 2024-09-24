import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: any;
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
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

  isNestedMenuOpen = computed(() => this.sidenavService.nestedMenuOpen());

  toggleNested() {
    this.sidenavService.toggleNestedService();
  }
}
