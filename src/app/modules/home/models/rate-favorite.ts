export interface Irate_IFavorite {
    rate?:number 
    item?:Iitem
}

export interface Iitem{
    etag?:string
    id?:string
    kind?:string
    snippet?:{
        channelId?:string
        title?:string
    }
    publishedAt?:string
    channelId?:string
    thumbnails?:{}
    channelTitle?:string
    tags?:[]
    categoryId?:string
    liveBroadcastContent?:string
    localized?:[]
}