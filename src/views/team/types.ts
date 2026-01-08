export interface Data {
  id: number;
  name: string;
  status: string;
  image: string;
  updated_at: string;
  created_at: string;
}

export interface TeamMemberBackend {
  id: number;
  name: string;
  status: string;
  image: string | null;
  biography: string;
  specialization: string;

  result?: ImageBackend[];
}

export interface ImageBackend {
  id: number;
  path: string;
  description: string;
  order: number;
}

export interface TeamMemberFrontend {
  name: string;
  status: string;
  image: File | string | null;
  biography: string;
  specialization: string;

  result: {
    deleted: number[];
    updated: ImageBackend[];
    new: Omit<ImageBackend, 'id'>[];
  };
}

