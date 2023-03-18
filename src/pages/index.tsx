/* eslint-disable @typescript-eslint/no-unused-vars */
import { history, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Select, Space } from 'antd';
import { useEffect } from 'react';
import { SerialPort } from 'serialport';

export default (props: any) => {
  const { setPorts } = useModel('PortsInfo');
  const { data } = useRequest(SerialPort.list);
  useEffect(() => {
    setPorts(data || []);
  }, [data]);
  return (
    <Space>
      串口：
      <Select
        options={data?.map((p) => ({
          label: p.path + p.manufacturer,
          value: p.path,
        }))}
        style={{ width: 200 }}
      />
      <Button
        onClick={() => {
          history.push('/next');
        }}
      >
        下一页
      </Button>
    </Space>
  );
};
