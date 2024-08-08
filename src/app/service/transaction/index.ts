import { ITransaction } from "@/types/transaction"
import {DefaultApi} from "@/app/service/default";

const endpoint = '/app/transaction'
const resourceId = 'id'

export const ApiTransaction = new DefaultApi<ITransaction>(endpoint, resourceId)