import * as localDb from './db'

export async function createRequest(_params: {
  customerId: string
  category: string
  title: string
  description: string
  budget: number
  urgency: string
  location: string
}) {
  localDb.createRequest({
    customerId: _params.customerId,
    category: _params.category as any,
    title: _params.title,
    description: _params.description,
    budget: _params.budget,
    urgency: _params.urgency as any,
    location: _params.location,
  })
}

export async function acceptRequest(_params: { requestId: string; workerId: string }) {
  localDb.acceptRequest(_params)
}

export async function selectWorker(_params: { requestId: string; customerId: string; workerId: string }) {
  localDb.selectWorker(_params)
}

export async function proposeInspection(_params: { requestId: string; workerId: string; whenIso: string }) {
  localDb.proposeInspection(_params)
}

export async function customerConfirmInspection(_params: { requestId: string; customerId: string }) {
  localDb.customerConfirmInspection(_params)
}

export async function workerCompleteInspection(_params: { requestId: string; workerId: string }) {
  localDb.workerCompleteInspection(_params)
}

export async function customerConfirmInspectionCompleted(_params: { requestId: string; customerId: string }) {
  localDb.customerConfirmInspectionCompleted(_params)
}

export async function submitQuote(_params: { requestId: string; workerId: string; amount: number; notes?: string }) {
  localDb.submitQuote(_params)
}

export async function customerConfirmWorkSchedule(_params: { requestId: string; customerId: string }) {
  localDb.customerConfirmWorkSchedule(_params)
}

export async function scheduleWork(_params: { requestId: string; workerId: string; whenIso: string }) {
  localDb.scheduleWork(_params)
}

export async function workerCompleteWork(_params: { requestId: string; workerId: string }) {
  localDb.workerCompleteWork(_params)
}

export async function customerConfirmWorkCompleted(_params: { requestId: string; customerId: string }) {
  localDb.customerConfirmWorkCompleted(_params)
}

export async function markPayment(_params: { requestId: string; workerId: string; status: string }) {
  localDb.markPayment({ ..._params, status: _params.status as 'pending' | 'paid' })
}

export async function addReview(_params: { requestId: string; customerId: string; workerId: string; rating: number; comment?: string }) {
  localDb.addReview({
    requestId: _params.requestId,
    customerId: _params.customerId,
    rating: _params.rating as 1 | 2 | 3 | 4 | 5,
    comment: _params.comment,
  })
}

export async function chooseOffer(_params: { requestId: string; customerId: string; offerId: string }) {
  localDb.chooseOffer({
    requestId: _params.requestId,
    customerId: _params.customerId,
    workerId: _params.offerId,
  })
}

export async function submitQuoteOffer(_params: { requestId: string; workerId: string; amount: number; notes?: string }) {
  localDb.submitQuoteOffer(_params)
}

export async function createCustomer(_params: { name: string; email: string; password: string; phone?: string }) {
  localDb.createCustomer({ name: _params.name, email: _params.email, phone: _params.phone })
}

export async function updateCustomer(_params: { customerId: string; patch: { name?: string; email?: string; phone?: string } }) {
  localDb.updateCustomer(_params)
}

export async function setCustomerActive(_params: { customerId: string; active: boolean }) {
  localDb.setCustomerActive(_params)
}

export async function deleteCustomer(_params: { customerId: string }) {
  localDb.deleteCustomer(_params)
}

export async function createWorker(_params: { name: string; email: string; password: string; phone?: string }) {
  localDb.createWorker({ name: _params.name, email: _params.email, phone: _params.phone })
}

export async function updateWorker(_params: {
  workerId: string
  patch: {
    name?: string
    email?: string
    phone?: string
    whatsapp?: string
    viber?: string
    categories?: string[]
    skills?: string[]
    about?: string
    promoPosterUrl?: string
  }
}) {
  localDb.updateWorker(_params as any)
}

export async function setWorkerActive(_params: { workerId: string; active: boolean }) {
  localDb.setWorkerActive(_params)
}

export async function deleteWorker(_params: { workerId: string }) {
  localDb.deleteWorker(_params)
}

export async function adminResetPassword(_params: { userId: string; password: string }) {
  console.warn('Password reset is not available in client-only Firebase mode.', _params.userId)
}

export async function updateWorkerProfile(_params: {
  workerId: string
  name?: string
  email?: string
  phone?: string
  whatsapp?: string
  viber?: string
  categories?: string[]
  skills?: string[]
  about?: string
  promoPosterUrl?: string
}) {
  localDb.updateWorkerProfile({
    workerId: _params.workerId,
    patch: {
      name: _params.name,
      email: _params.email,
      phone: _params.phone,
      whatsapp: _params.whatsapp,
      viber: _params.viber,
      categories: _params.categories as any,
      skills: _params.skills,
      about: _params.about,
      promoPosterUrl: _params.promoPosterUrl,
    },
  })
}
