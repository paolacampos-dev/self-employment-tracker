CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS invoices (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id TEXT NOT NULL, 
job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
invoice_number TEXT NOT NULL,
amount NUMERIC(10, 2),
status TEXT NOT NULL DEFAULT 'outstanding'
CHECK (status IN ('outstanding', 'paid')),
date_issued DATE,
due_date DATE
);

ALTER TABLE invoices
ADD CONSTRAINT unique_invoice_number UNIQUE (invoice_number);

SELECT conname
FROM pg_constraint
WHERE conrelid = 'invoices'::regclass;

ALTER TABLE invoices
DROP CONSTRAINT invoices_status_check;

ALTER TABLE invoices
ADD CONSTRAINT invoices_status_check
CHECK (status IN ('Draft', 'Sent', 'Paid'));

ALTER TABLE invoices
ALTER COLUMN status SET DEFAULT 'Draft';

CREATE TABLE IF NOT EXISTS expenses (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id TEXT NOT NULL, 
job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
amount NUMERIC(10, 2),
concept TEXT,
date DATE
);

ALTER TABLE expenses
ADD COLUMN category TEXT
CHECK (
  category IN (
    'office_equipment',
    'travel_vehicle',
    'clothing',
    'staff',
    'reselling_goods',
    'legal_financial',
    'marketing',
    'training',
    'home_office',
    'software_phone_internet',
    'insurance',
    'bank_charges',
    'repairs',
    'professional_fees',
    'other'
  )
);

CREATE TABLE IF NOT EXISTS jobs (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id TEXT NOT NULL, 
client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
title TEXT, 
job_details TEXT,
status TEXT NOT NULL DEFAULT 'active'
CHECK (status IN ('active', 'completed', 'archived')),
start_date DATE,
deadline DATE,
hours_expected NUMERIC(10, 2), 
hours_worked NUMERIC(10, 2), 
hourly_rate NUMERIC (10, 2)
);

ALTER TABLE jobs
ADD COLUMN price int;

ALTER TABLE jobs
DROP CONSTRAINT jobs_status_check;

ALTER TABLE jobs
ADD CONSTRAINT jobs_status_check
CHECK (status IN ('in_progress', 'live', 'completed', 'cancelled'));