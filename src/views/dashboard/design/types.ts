/* export interface ChooseCarouselStaticForm {
  carousel: boolean|null;
  imageVideo: boolean|null;
  carouselUrls: carouselUrlsInt[];
  imageVideoUrl: File | string | null;
}

export interface carouselUrlsInt {
  url: string | File
  title: string
  text: string
}

export interface Background {
  background1: string | File | null;
  background2: string | File | null;
  background3: string | File | null;
}

export interface ChooseCarouselNavbarForm {
  carouselNavbar: (string | File)[];
}
 */

export interface Background {
  path: string | File | null
  title: string
  subtitle: string
}

export interface CarouselItem {
  path: string | File | null
  title: string
  subtitle: string
}

export interface DesignResponse {
  background1: Background | null
  background2: Background | null
  background3: Background | null
  carousel: CarouselItem[]
  carouselNavbar: CarouselItem[]
  carouselTool: CarouselItem[]
  imageVideo: Background | null
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

