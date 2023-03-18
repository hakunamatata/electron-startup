/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from 'react';
import { PortInfo } from '@serialport/bindings-cpp';

export default function usePortInfo() {
  const [ports, setPorts] = useState<PortInfo[]>([]);
  return { ports, setPorts };
}
