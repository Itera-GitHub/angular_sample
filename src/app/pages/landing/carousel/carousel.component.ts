import { AfterViewInit,Component,ContentChildren,ElementRef,Input,QueryList,ViewChild,ViewChildren,PLATFORM_ID,Inject } from '@angular/core';
import { CarouselDirective } from '../carousel.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  template: `
    <section class="carousel-wrapper" [ngStyle]="carouselWrapperStyle" #wrapper>
      <ul class="carousel-inner" #carousel>
        <li *ngFor="let item of items;" #itemsElements class="carousel-item">
          <ng-container [ngTemplateOutlet]="item.tpl"></ng-container>
        </li>
      </ul>
    </section> 
    <div  class="carousel-nav">
      <div class="prev {{!showPrev ? 'disabled' : ''}}" (click)="prev()">
        <i class="icon-back"></i>
      </div>
      <div class="next {{!showNext ? 'disabled' : ''}}" (click)="next()">
        <i class="icon-next"></i>
      </div>
    </div>
  `,
  styles: [`
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 6000px;
    }

    .carousel-wrapper {
      overflow: hidden;
    }
    
    .carousel-nav .prev.disabled, .carousel-nav .next.disabled {
       opacity: 0;
    }
    
    .carousel-nav .prev:hover, .carousel-nav .next:hover {
      cursor: pointer;
    }
    
    .carousel-nav .prev, .carousel-nav .next {
      width: 35px;
      height: 35px;
      text-align: center;
      padding: 0;
      line-height: 38px;
      border-radius: 50%;
      font-size: 11px;
      color: #262a30;
      background: rgba(255,255,255,.9);
    }

    .carousel-nav {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      padding: 0 25px;
      margin-top: -50px;
      display: flex;
      justify-content: space-between;
    }
    
    .carousel-wrapper {
      overflow: visible;
    }
    
    .carousel-inner {
      width: 1387px;
      transform: translate3d(0px, 0px, 0px);
      transition: all 0s ease 0s;
      position: relative;
      touch-action: manipulation;
    }
    
    .carousel-item {
      width: 316.667px;
      margin-right: 30px;
    }
    
    .carousel-inner {
      display: flex;
    }

  `]
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselDirective) items : QueryList<CarouselDirective>;
  @ViewChildren('itemsElements', { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @ViewChild('wrapper') private wrapper : ElementRef;
  @Input() timing = '1s ease';
  @Input() showControls = true;
  player : AnimationPlayer;
  itemWidth : number;
  itemsShown : number;
  wrapperWidth : number;
  showNext : boolean = false;
  showPrev : boolean = false;
  currentSlide = 0;
  carouselWrapperStyle = {};

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    let step = this.currentSlide == 1 ? 35 : 30;
    const offset = this.currentSlide * (this.itemWidth+step);
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    this.itemsShown = this.itemsShown + 1;
    this.showNext = this.itemsShown < 4;
    this.showPrev = true;
  }

  private buildAnimation( offset ) {
    let value = offset ? offset+'px' : 0;
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${value})` }))
    ]);
  }

  prev() {
    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    let step = this.currentSlide == 1 ? 35 : 30;
    const offset = this.currentSlide * (this.itemWidth+step);
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
    this.itemsShown = this.itemsShown - 1;
    this.showNext = true;
    this.showPrev = this.itemsShown > Math.floor(this.wrapperWidth/this.itemWidth);
  }

  constructor( private builder : AnimationBuilder
    , @Inject(PLATFORM_ID) private platformId: Object ) {
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId) && this.itemsElements && this.itemsElements.first && this.itemsElements.first.nativeElement){
      setTimeout(() => {
        this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
        this.wrapperWidth = this.wrapper.nativeElement.offsetWidth;
        this.itemsShown = Math.floor(this.wrapperWidth/this.itemWidth);
        if(this.itemsShown < 4){
          this.showNext = true;
        }
      }, 500);
    }
  }
}
