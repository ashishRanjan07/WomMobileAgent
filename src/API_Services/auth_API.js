import {
    ADD_NEW_AGENT,
    UPDATE_AGENT_PROFIT,
    UPDATE_AGENT_DOCUMENTS,
    LOGIN_AGENT,
} from './API_Services'


export const add_new_agent = async (data) => {
    try {
        const response = await ADD_NEW_AGENT(data)
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

export const update_agent_profit = async (data) => {
    try {
        const response = await UPDATE_AGENT_PROFIT(data)
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

export const upload_agent_documents = async (data) => {
    try {
        const response = await UPDATE_AGENT_DOCUMENTS(data)
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

export const login_agent = async (data) => {
    try {
        const response = await LOGIN_AGENT(data)
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