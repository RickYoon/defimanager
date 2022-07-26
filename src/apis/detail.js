import { defaultInstance } from "apis/utils"

export const getDetailData = async (projectName) => {
    try {
        const {data} = await defaultInstance.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/infoDetail_v2?proj=${projectName}`)
        return data
    } catch (e) {
        console.log(e)
    }
}