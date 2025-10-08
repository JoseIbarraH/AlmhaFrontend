export interface SlideItem {
  url: string
  alt?: string
  title?: string
  text?: string
  type: 'image' | 'video'
  poster?: string
  controls?: boolean
}

export interface Props {
  images: (string | Partial<SlideItem>)[]
  defaultText?: string
  defaultTitle?: string
  autoplay?: number
  autoplayVideos?: boolean
}

export interface ChooseCarouselStaticForm {
  carousel: boolean|null;
  imageVideo: boolean|null;
  carouselUrls: carouselUrlsInt[];
  imageVideoUrl: File | string | null;
}

export interface carouselUrlsInt {
  url: string
  title: string
  text: string
  titleen: string
  texten: string
}

export interface Background {
  background1: string;
  background2: string;
  background3: string;
}

export interface ChooseCarouselNavbarForm {
  carouselNavbar: (string | File)[];
}
