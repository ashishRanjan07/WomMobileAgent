import axios from 'axios'
import { serverAddress } from './server_Address'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_TOKEN = async () => {
    const token = await AsyncStorage.getItem('token');
    return (token);
}

export const GET_AGENT_ID = async () => {
    let agnt_ID = JSON.parse(await AsyncStorage.getItem('details'));
    console.log(agnt_ID.user._id,"Line 12")
    const idHere = agnt_ID.user._id
    console.log(idHere,"Line 13")
    return (idHere);
}

// export const GET_USER_DETAILS = async () => {

//     let data = JSON.parse(await AsyncStorage.getItem('details'));
//     const userDetails = data.user

//     // console.log('userDetails', userDetails);
//     return (userDetails);
// }

// export const GET_USER_DETAILS_ID = async () => {

//     let userToken = await GET_USER_TOKEN();

//     let orgID = await GET_USER_DETAILS();
//     let id = orgID.org_admin_id._id
//     const url = `${serverAddress}/api/organisation/v2/get-org-details/${id}`

//     const response = await axios
//         .get(url,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + userToken
//                 },
//             })
//         .then((res) => res?.data)
//         .catch((error) => error?.response?.data)

//     return response
// }

// export const ORG_LOGIN = async (data) => {

//     const url = `${serverAddress}/api/organisation/v2/login-org-user`

//     const response = await axios
//         .post(url, data)
//         .then((res) => res?.data)
//         .catch((error) => error?.response?.data)
//     return response
// }

export const ADD_NEW_AGENT = async (data) => {
    const url = `${serverAddress}/api/agent/v2/add-new-agent`

    const response = await axios
        .post(url, data)
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
console.log(response,"Line 65")
    return response
}

export const UPDATE_AGENT_PROFIT = async (data) => {
    const url = `${serverAddress}/api/agent/v2/update-agent-profit`

    const response = await axios
        .patch(url, data)
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)

    return response
}

export const UPDATE_AGENT_DOCUMENTS = async (data) => {
    const url = `${serverAddress}/api/agent/v2/upload-agent-documents`

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
console.log(response,"Line 92")
    return response
}

export const LOGIN_AGENT = async (data) => {
    const url = `${serverAddress}/api/agent/v2/login-agent`

    const response = await axios
        .post(url, data)
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)

    return response
}

export const GET_AGENT = async () => {

    let userToken = await GET_TOKEN();
    let agent_id = await GET_AGENT_ID();

    const url = `${serverAddress}/api/agent/v2/get-agent/${agent_id}`;

    const response = await axios
        .get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
console.log(response,"Line 125")
    return response
}

export const GET_ALL_INDUSTRY = async () => {

    const url = `${serverAddress}/api/industry/v2/get-all-industry`

    const response = await axios
        .get(url)
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_PARTNER_UP = async () => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/get-partner-up`

    const response = await axios
        .get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_FILTER_PARTNER_UP = async (data) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/get-filter-partner-up`

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken,
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const SEND_PARTNERSHIP_REQUEST = async (data) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/send-partnership-request`

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_ALL_CUSTOMER = async () => {

    const url = `${serverAddress}/api/customer/v2/get-all-customer`
    let userToken = await GET_TOKEN();

    let agent_id = await GET_AGENT_ID();

    let data = {
        "org_id": agent_id,
    }

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)

    return response
}

export const CREATE_CUSTOMER = async (data) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/customer/v2/create-customer`

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_AGENT_PARTNERSHIP_REQUEST = async () => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/get-agent-partnership-request`

    const response = await axios
        .get(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const DECLINE_PARTNERSHIP_REQUEST = async (id, req_id, cancelResion, validity) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/decline-partnership-request`

    let data = {
        "partner_id": id,
        "requested_id": req_id,
        "declined_reason": cancelResion,
        "validity": validity
    }

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_COUPON_TYPE = async () => {

    const url = `${serverAddress}/api/organisation/v2/get-coupon-type`

    const response = await axios
        .get(url)
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const ACCEPT_PARTNERSHIP_REQUEST = async (id, req_id) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/accept-partnership-request`

    let data = {
        "org_id": id,
        "requested_id": req_id
    }

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const RESEND_PARTNERSHIP_REQUEST = async (id, req_id) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/resend-partnership-request`

    let data = {
        "org_id": id,
        "requested_id": req_id,
    }

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const UPDATE_AGENT_DETAILS = async (data) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/update-agent-details`

    const response = await axios
        .patch(url, data,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const UPDATE_AGENT_PROFILE_IMAGE = async (data) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/agent/v2/upload-agent-profile`

    const response = await axios
        .post(url, data,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_AGENT_STATISTICS = async () => {

    let userToken = await GET_TOKEN();
    console.log(userToken,"Line 390")
    const url = `${serverAddress}/api/agent/v2/get-agent-statistics`

    const response = await axios
        .get(url,
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}

export const GET_COUPON_DETAILS = async (data_pass) => {

    let userToken = await GET_TOKEN();
    const url = `${serverAddress}/api/organisation/v2/get-coupon-details`

    const response = await axios
        .post(url, data_pass,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
            }
        )
        .then((res) => res?.data)
        .catch((error) => error?.response?.data)
    return response
}