import { isApplicationStatus } from '../src/types/application';
import { createApplication, listApplications, validateApplicationPayload } from '../src/server/applications';

type ApiRequest = {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
};

type ApiResponse = {
  status: (statusCode: number) => ApiResponse;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const getIpAddress = (req: ApiRequest) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (Array.isArray(forwarded)) return forwarded[0];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? '';
  return req.socket?.remoteAddress ?? '';
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'POST') {
    const validation = validateApplicationPayload(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: 'Validierung fehlgeschlagen.', errors: validation.errors });
    }

    const created = await createApplication(validation.data, getIpAddress(req));
    return res.status(201).json({ message: 'Bewerbung erfolgreich gespeichert.', id: created.id });
  }

  if (req.method === 'GET') {
    const statusRaw = req.query?.status;
    const statusParam = typeof statusRaw === 'string' ? statusRaw : undefined;

    if (statusParam && !isApplicationStatus(statusParam)) {
      return res.status(400).json({
        message: 'Ungültiger Status-Filter.',
        allowed: ['new', 'in_review', 'accepted', 'rejected'],
      });
    }

    const applications = await listApplications(statusParam);
    return res.status(200).json({ applications, count: applications.length, filter: { status: statusParam ?? null } });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ message: 'Methode nicht erlaubt.' });
}
