export interface IEmoji {
  id: string
  keywords: Array<string>
  name: string
  native: string
  shortcodes: string
  unified: string
}

export interface IUser {
  email: string
  _id: string
  picture: string
  name: string
}

export interface IVideos {
  room: string
  video: string
}

interface IThumbanilsProps {
  url: string
  width: number
  height: number
}

interface IThumbnails {
  default: IThumbanilsProps
  high: IThumbanilsProps
  medium: IThumbanilsProps
}

interface IYtbSnippet {
  title: string
  channelId: string
  channelTitle: string
  description: string
  liveBroadcastContent: string
  publishTime: Date
  PublishedAt: Date
  thumbnails: IThumbnails
}

interface IYtbId {
  videoId: number
  kind: string 
  channelId: string
}

interface IPropertyItems {
  publishedAt: string
  channelId: string
  title: string
  id: IYtbId
  snippet: IYtbSnippet
}

export interface IYTBVideos {
  etag: string
  items: Array<IPropertyItems>
  kind: string
  nextPageToken: string
  pageInfo: Object
  regionCode: string
}