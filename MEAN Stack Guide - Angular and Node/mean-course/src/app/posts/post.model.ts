//Defines the properties and types of the Post model
export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string | null;
  creator: string;
}