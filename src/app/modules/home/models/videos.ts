export interface IVideos {
    kind: string;
    etag: string;
    nextPageToken: string;
    prevPageToken?:string;
    regionCode: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: Ivideo_details[] | any[];
  }


  interface Ivideo_details{
        kind: string;
        etag: string;
        id: {
          kind: string;
          videoId: string;
        };
        snippet: {
          publishedAt: string;
          channelId: string;
          title: string;
          description: string;
          thumbnails: {
            default: {
              url: string;
              width: number;
              height: number;
            };
            medium: {
              url: string;
              width: number;
              height: number;
            };
            high: {
              url: string;
              width: number;
              height: number;
            };
          };
          channelTitle: string;
          liveBroadcastContent: string;
          publishTime: string;
        }
  }