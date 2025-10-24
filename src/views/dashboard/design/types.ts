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
  carouselNavbar: CarouselItem[]
  carouselTool: CarouselItem[]
  carouselStatic: CarouselStatic
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface CarouselStatic {
  carouselSetting: boolean | null
  imageVideoSetting: boolean | null
  carousel: CarouselItem[]
  imageVideo: Background | null
}
