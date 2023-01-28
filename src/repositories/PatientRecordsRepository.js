import Repository, { baseUrl, serializeQuery } from './Repository';

class PatientRecordsRepository {
    async getList(params){
        try {
        const url = `${baseUrl}/patients?${serializeQuery(params)}`;
        const response = await Repository.get(url);
        return response;
        } catch(err) {
        throw Error(err);
        }
    }
    async getIdList(params){
        try {
        const url = `${baseUrl}/patient_id?${serializeQuery(params)}`;
        const response = await Repository.get(url);
        return response;
        } catch(err) {
        throw Error(err);
        }
    }
    async getDetail(id){
        try {
        const url = `${baseUrl}/patient/${id}`;
        const response = await Repository.get(url);
        return response;
        } catch(err) {
        throw Error(err);
        }
    }
}

export default new PatientRecordsRepository;