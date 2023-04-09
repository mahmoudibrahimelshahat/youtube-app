export interface IVideo {
    kind: string;
    etag: string;
    items?: Video[];
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}

interface Video {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        like?: number | 0
        watch?: number | 0
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: {
            default: Thumbnail;
            medium: Thumbnail;
            high: Thumbnail;
            standard: Thumbnail;
            maxres: Thumbnail;
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
            title: string;
            description: string;
        }
    }
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}