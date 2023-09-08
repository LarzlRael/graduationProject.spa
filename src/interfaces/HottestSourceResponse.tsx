export interface GeoJSONResponse {
    type: string;
    name: string;
    crs: CRS;
    features: any[];
}
export interface GeoJsonResponseCount{
    geojson: GeoJSONResponse;
    count: number;
}

export interface CRS {
    type: string;
    properties: Properties;
}

export interface Properties {
    name: string;
}
