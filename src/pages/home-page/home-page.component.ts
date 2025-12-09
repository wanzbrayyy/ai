import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { AboutComponent } from '../../components/about/about.component';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, AboutComponent, FaqComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private fragmentSubscription: Subscription | undefined;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
        if (fragment) {
          // Add a small delay to ensure the element is rendered
          setTimeout(() => this.scrollToFragment(fragment), 100);
        }
      });
    }
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    this.fragmentSubscription?.unsubscribe();
  }
}