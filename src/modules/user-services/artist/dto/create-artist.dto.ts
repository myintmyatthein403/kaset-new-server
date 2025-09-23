export class CreateArtistDto {
  name: string;
  bio: string;
  location?: string;
  email?: string;
  slug: string;
  claimable: boolean;
  profile_image?: {
    id: string;
  };
  cover_image?: {
    id: string;
  };
  featured_videos?: {
    id: string;
  }[];
  pairs: {
    id: string;
    dropdownValue: string;
    textValue: string;
  }[]
}
