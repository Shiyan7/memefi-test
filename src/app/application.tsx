import './application.css';

import { Table } from '@/widgets/table';

export function Application() {
  return (
    <div class="flex justify-center bg-gray-100 py-10 px-5 min-h-screen items-center">
      <Table />
    </div>
  );
}
