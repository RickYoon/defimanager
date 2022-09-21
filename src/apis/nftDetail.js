import { defaultInstance } from "apis/utils"

export const getNftDetailData = async () => {
    try {
        const {data} = await defaultInstance.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/nftrealtrx`)
        return data
    } catch (e) {
        console.log(e)
    }
}