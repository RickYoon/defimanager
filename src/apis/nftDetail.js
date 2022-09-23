import { defaultInstance } from "apis/utils"

export const getNftDetailData = async (id) => {
    try {
        const {data} = await defaultInstance.get(`https://uv8kd7y3w5.execute-api.ap-northeast-2.amazonaws.com/production/nftrealtrx_v1?proj=${id}`)
        return data
    } catch (e) {
        console.log(e)
    }
}