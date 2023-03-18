/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useMemo, useState } from 'react';
import { message } from 'antd';
import { SerialPort } from 'serialport';
import { useModel } from '@umijs/max';

export default function useCurrentPort() {
  const { ports } = useModel('PortsInfo');
  const [
    /**
     * 当前端口
     */
    currentPort,
    /**
     * 设置当前端口
     */
    setCurrentPort,
  ] = useState<SerialPort>();

  const currentPortInfo = useMemo(() => {
    return ports.find((p) => p.path === currentPort?.path);
  }, [ports, currentPort]);

  const portName = useMemo(() => {
    return currentPortInfo
      ? `${currentPortInfo.path} ${currentPortInfo.manufacturer}`
      : undefined;
  }, [currentPort, ports]);
  /**
   * 打开端口
   */
  const openPort = useCallback(() => {
    if (!currentPort) message.error('当前端口尚未初始化');
    if (currentPort?.isOpen) message.warning(`当前端口 "${portName}" 已经打开`);
    currentPort?.on('open', () => {
      message.info(`${portName} 打开成功`);
    });
    // currentPort?.on('error', () => { message.error(`${portName} 打开失败，请稍后再试！`) })
    currentPort?.open((err) => {
      if (err) message.error(`${portName} 打开失败: ${err.message}`);
    });
  }, [currentPort]);
  /**
   * 实例化一个新端口
   */
  const connectPort = useCallback((path: string, autoOpen?: boolean) => {
    setCurrentPort(
      new SerialPort({ path, baudRate: 9600, autoOpen: !!autoOpen }),
    );
  }, []);

  return { currentPort, setCurrentPort, openPort, connectPort };

  // // Read data that is available but keep the stream in "paused mode"
  // port.on('readable', function () {
  //     console.log('Data:', port.read())
  // })

  // // Switches the port into "flowing mode"
  // port.on('data', function (data) {
  //     console.log('Data:', data)
  // })

  // // Pipe the data into another stream (like a parser or standard out)
  // const lineStream = port.pipe(new Readline())

  // port.write('Hi Mom!')
  // port.write(Buffer.from('Hi Mom!'))
}
