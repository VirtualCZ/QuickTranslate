import { Accordion, Box, Button, Center, Checkbox, Grid, Group, Stack } from '@mantine/core';
import LanguageCheckbox from '../Elements/LanguageCheckbox';
import ThemeButton from '../Elements/ThemeButton';
import React from 'react';

function LanguageAccordion({ handleTranslate, setSelectedLanguages, selectedLanguages }) {

    function AccordionControl(props: AccordionControlProps) {
        return (
            <Center>
                <Accordion.Control {...props} />
                <Button
                    style={{
                        minWidth: "fit-content",
                        borderRadius: "0 19px 0 0",
                        height: "49px",
                    }}
                    disabled={selectedLanguages == false ? true : false}
                    onClick={handleTranslate}>Translate</Button>
            </Center>
        );
    }

    const handleLanguageCheckboxChange = (language) => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages(selectedLanguages.filter(item => item !== language));
        } else {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };

    const handleCheckAllLanguages = () => {
        setSelectedLanguages(['Catalan', 'Czech', 'German', 'Estonian', 'French', 'Hungarian', 'Croatian', 'Italian', 'Polish', 'Russian', 'Slovak', 'Swedish']);
    };

    const handleUncheckAllLanguages = () => {
        setSelectedLanguages([]);
    };
    return (
        <Box
            style={{
                position: 'absolute',
                top: '100%',
                left: "0",
                transform: 'translateY(-100%)',
                width: '100%'
            }}>
            <Accordion
                style={{
                    left: "0",
                    width: '100%',
                    borderRadius: "20px",
                    overflow: "hidden"
                }}
                mb="md"
                variant="contained"
                chevronPosition="left"
            >
                <Accordion.Item
                    style={{
                        borderRadius: "20px"
                    }}
                    value="item">
                    <AccordionControl>
                        Select languages
                    </AccordionControl>
                    <Accordion.Panel>
                        <Stack
                            align="stretch"
                            justify="center"
                            gap="xl"
                        >
                            <Grid grow>
                                {['Catalan', 'Czech', 'German', 'Estonian', 'French', 'Hungarian', 'Croatian', 'Italian', 'Polish', 'Russian', 'Slovak', 'Swedish'].map(language => (
                                    <Grid.Col span={{ base: 6, sm: 4, md: 3, lg: 2 }}>
                                        <LanguageCheckbox
                                            key={language}
                                            language={language}
                                            checked={selectedLanguages.includes(language)}
                                            onChange={() => handleLanguageCheckboxChange(language)}
                                        />
                                    </Grid.Col>
                                ))}
                            </Grid>
                            <Center>
                                <Group justify="center">
                                    <Button onClick={handleCheckAllLanguages}>Check All</Button>
                                    <Button onClick={handleUncheckAllLanguages}>Uncheck All</Button>
                                </Group>
                            </Center>
                            <ThemeButton />
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
}

export default LanguageAccordion;
