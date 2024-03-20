export interface IEmoji {
  id: string
  keywords: Array<string>
  name: string
  native: string
  shortcodes: string
  unified: string
}

export interface IUser {
  email: string,
  _id: string,
  picture: string,
  name: string
}

export interface IVideos {
  room: string,
  video: string,
}