import {defaultInstance} from "apis/utils"

export const getTvlData = async () => {
    try {
        const {data} = await defaultInstance.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/tvllist")
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getTotalChartData = async () => {
    try {
        const {data} = await defaultInstance.get("https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/newChart")
        return data
    } catch (e) {
        console.log(e)
    }
}