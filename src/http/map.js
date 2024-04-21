import request from "./index";
import {MAPPER_API} from "./apis";

//
/**
 * 经纬度（GCJ02坐标系）逆向地址转换
 * @param lat
 * @param lng
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @link https://lbs.qq.com/service/webService/webServiceGuide/address/Gcoder
 */
export const getLocationDesc = (lat, lng) => {
    return request.get(MAPPER_API.locationDesc, {
        params: {
            location: lat + ',' + lng,
            get_poi: 1,
            key: 'OB4BZ-D4W3U',  // 示例KEY, 需要到腾讯地图官网申请
            apptag: 'lbs_geocoder',
        },
    })
}

/**
 * 根据输入的地址，将其转换为经纬度坐标
 * @link https://lbs.qq.com/service/webService/webServiceGuide/address/Geocoder
 * @param {string} word 输入的地址
 * @returns {Promise<any>} 经纬度坐标
 */
export const wordTransToCoordinate = (word) => {
    return request.get(MAPPER_API.wordTransToCoordinate, {
        params: {
            address: word,
            key: 'OB4BZ-D4W3U',
            apptag: 'lbs_geocoder'
        },
    })
}

export const getSelfPickList = ({longitude, latitude}) => {
    return request.post('/map/selfPickup', {
        longitude,
        latitude,
        radius: 1000, // 1000m
    })
}
