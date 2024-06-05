import {
    GET_AGENT,
    GET_ALL_INDUSTRY,
    GET_PARTNER_UP,
    GET_FILTER_PARTNER_UP,
    SEND_PARTNERSHIP_REQUEST,
    GET_ALL_CUSTOMER,
    CREATE_CUSTOMER,
    GET_AGENT_PARTNERSHIP_REQUEST,
    DECLINE_PARTNERSHIP_REQUEST,
    GET_COUPON_TYPE,
    ACCEPT_PARTNERSHIP_REQUEST,
    RESEND_PARTNERSHIP_REQUEST,
    UPDATE_AGENT_DETAILS,
    UPDATE_AGENT_PROFILE_IMAGE,
    GET_AGENT_STATISTICS,
    GET_COUPON_DETAILS,
} from './API_Services'

export const get_agent = async () => {
    try {
        const response = await GET_AGENT()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_all_Industry = async () => {
    try {
        const response = await GET_ALL_INDUSTRY()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_partner_up = async () => {
    try {
        const response = await GET_PARTNER_UP()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_filter_partner_up = async (data) => {
    try {
        const response = await GET_FILTER_PARTNER_UP(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const send_partnership_request = async (data) => {
    try {
        const response = await SEND_PARTNERSHIP_REQUEST(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_all_customer = async () => {
    try {
        const response = await GET_ALL_CUSTOMER()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const create_customer = async (data) => {
    try {
        const response = await CREATE_CUSTOMER(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_agent_partnership_request = async () => {
    try {
        const response = await GET_AGENT_PARTNERSHIP_REQUEST()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const decline_partnership_request = async (id, req_id, cancelResion, validity) => {
    try {
        const response = await DECLINE_PARTNERSHIP_REQUEST(id, req_id, cancelResion, validity)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_Coupon_type = async () => {
    try {
        const response = await GET_COUPON_TYPE()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const accept_partnership_request = async (id, req_id) => {
    try {
        const response = await ACCEPT_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const resend_partnership_request = async (id, req_id) => {
    try {
        const response = await RESEND_PARTNERSHIP_REQUEST(id, req_id)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const update_agent_details = async (data) => {
    try {
        const response = await UPDATE_AGENT_DETAILS(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const update_agent_profile_image = async (data) => {
    try {
        const response = await UPDATE_AGENT_PROFILE_IMAGE(data)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_agent_statistics = async () => {
    try {
        const response = await GET_AGENT_STATISTICS()
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}

export const get_coupon_details = async (data_pass) => {
    try {
        const response = await GET_COUPON_DETAILS(data_pass)
        if (!response) {
            return `Can't connect to server`
        } else if (response?.error === true) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error.message
    }
}