export interface MunicipiosResponse {
    resp: MunResp[];
}

export interface MunResp {
    nombre_municipio: string;
    departamento:     string;
    provincia:        string;
}
