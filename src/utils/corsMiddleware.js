import Cors from "cors";

const cors = 
    Cors({
        methods:['GET' , 'HEAD']
    });

function runCors(req, res, fn) {
    return new Promise(
        (resolve, reject) => {
            fn(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        }
    );
}

export default function(req, res) {
    return runCors(req, res, cors);
}
