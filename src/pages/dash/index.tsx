import type { FC } from "react";
import { Button, Card, Col, Row, Toast, Typography } from "@douyinfe/semi-ui";
import useAsyncEffect from "use-async-effect";

import { fetchApi } from "~/lib";
import { Loading } from "~/components/Dash/Common";

const Dash: FC = () => {
  // TODO: I18n
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  async function onFetch () {
    const resp = await fetchApi<boolean>("init");
    if (resp.success) {
      setInitialized(resp.data);
    }
    setLoading(false);
  }
  useAsyncEffect(onFetch, []);

  async function onInit () {
    setLoading(true);
    let resp;
    try {
      resp = await fetchApi<boolean>("init", { method: "POST" });
    } catch (e: any) {
      Toast.error(`Error! ${e.data.error}`);
      return;
    }
    if (resp.success && resp.data) {
      setInitialized(true);
    }
    setLoading(false);
  }

  // TODO: Beautify
  return (
    <div>
      <Row>
        <Col span={6}>
          <Card>
            <Loading loading={loading}>
              <div className="flex justify-center flex-col">
                <Typography.Title className="text-center">
                  初始化Dolan
                </Typography.Title>
                {initialized
                  ? (
                    <Button className="mt-10 text-black! bg-emerald-300 hover:bg-emerald-400!">
                      已经初始化
                    </Button>
                  )
                  : (
                    <Button className="mt-10" onClick={onInit}>
                      初始化
                    </Button>
                  )}
              </div>
            </Loading>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dash;
