import Repository, { baseUrl, serializeQuery } from './Repository';

class PatientRecordsRepository {
    async getList(params){
        return new Promise(async(resolve,reject)=>{
            const url = `${baseUrl}/patients?${serializeQuery(params)}`;
            await Repository.get(url)
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
        })
    }
    async getIdList(params){
        return new Promise(async(resolve,reject)=>{
            const url = `${baseUrl}/patients_id?${serializeQuery(params)}`;
            await Repository.get(url)
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
        })
    }
    async getDetail(id){
        return new Promise(async(resolve,reject)=>{
            const url = `${baseUrl}/patient/${id}`;
            await Repository.get(url)
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
        })
    }
    async predict(payload) {
        return new Promise(async(resolve,reject)=>{
            const url = `${baseUrl}/patient/predict`;
            await Repository.post(url, payload)
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });
        })
    }
}

export default new PatientRecordsRepository;