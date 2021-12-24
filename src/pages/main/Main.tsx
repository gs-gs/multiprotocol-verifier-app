import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Box, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { MdCheckCircle, MdError } from "react-icons/md";
import ReactJson from "react-json-view";
// import QrReader from "react-qr-reader";
import QrReader from "react-qr-scanner";

import { Dropzone } from "../../components";
import { MainLayout } from "../../layouts";
import { verifyFile, verifyQRCode } from "../../services/verify";

export const Main: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyResult, setVerifyResult] =
    useState<{ success: boolean; data: any; logs: string[] }>(null);
  const [verifyError, setVerifyError] = useState(null);

  const handleFileAccepted = (file: File) => {
    setIsVerifying(true);

    verifyFile(file)
      .then((res) => {
        setIsVerifying(false);
        setVerifyError(null);
        setVerifyResult(res);
      })
      .catch((err) => {
        setIsVerifying(false);
        setVerifyError(err.message);
        setVerifyResult(null);
      });
  };

  const handleClickRetry = () => {
    setVerifyResult(null);
    setVerifyError(null);
  };

  const handleError = (err: Error) => {
    setVerifyError(err.message);
  };

  const handleScan = (data) => {
    if (data) {
      setIsVerifying(true);

      verifyQRCode(data.text)
        .then((res) => {
          setIsVerifying(false);
          setVerifyError(null);
          setVerifyResult(res);
        })
        .catch((err) => {
          setIsVerifying(false);
          setVerifyError(err.message);
          setVerifyResult(null);
        });
    }
  };

  return (
    <MainLayout>
      <Flex direction="column">
        {isVerifying ? (
          <Box display="flex" alignItems="center" flexDir="column">
            <Box my={2}>
              <Text>Verifying document</Text>
            </Box>
            <Spinner color="blue" />
          </Box>
        ) : verifyError ? (
          <>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Verification Error!</AlertTitle>
              <AlertDescription>{verifyError}</AlertDescription>
              <Button
                onClick={handleClickRetry}
                position="absolute"
                right="8px"
              >
                Retry
              </Button>
            </Alert>
          </>
        ) : verifyResult ? (
          <>
            <Box my={2}>
              <Alert status={verifyResult.success ? "success" : "error"}>
                <AlertIcon />
                <AlertTitle mr={2}>
                  {verifyResult.success
                    ? "Verification Success!"
                    : "Verification Failed!"}
                </AlertTitle>
                <Button
                  colorScheme="blue"
                  onClick={handleClickRetry}
                  position="absolute"
                  right="8px"
                >
                  Retry
                </Button>
              </Alert>
            </Box>
            <Box my={2}>
              <Tabs>
                <TabList>
                  {verifyResult.success && <Tab>Result</Tab>}
                  <Tab>Logs</Tab>
                </TabList>
                <TabPanels>
                  {verifyResult.success && (
                    <TabPanel>
                      <ReactJson
                        src={verifyResult.data}
                        displayDataTypes={false}
                      />
                    </TabPanel>
                  )}
                  <TabPanel>
                    <List spacing={3}>
                      {verifyResult.logs.map((log, index) => (
                        <ListItem key={`log-${index}`}>
                          <ListIcon
                            as={
                              log.toLowerCase().indexOf("error") !== -1
                                ? MdError
                                : MdCheckCircle
                            }
                            color={
                              log.toLowerCase().indexOf("error") !== -1
                                ? "red.500"
                                : "green.500"
                            }
                          />
                          {log}
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </>
        ) : (
          <>
            <BrowserView>
              <Box my={2}>
                <Text>Upload a file to verify.</Text>
              </Box>
              <Dropzone onFileAccepted={handleFileAccepted} />
            </BrowserView>

            <MobileView>
              {/* <QrReader
                delay={300}
                resolution={900}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              /> */}
              <QrReader
                facingMode="rear"
                style={{
                  height: 240,
                  width: 320,
                }}
                onError={handleError}
                onScan={handleScan}
              />
            </MobileView>
          </>
        )}
      </Flex>
    </MainLayout>
  );
};
