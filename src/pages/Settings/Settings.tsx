import {
  Box,
  Heading,
  IconButton,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../redux/slices/location.slice";
import { AppDispatch, RootState } from "../../redux/store";

const SettingsPopUp = ({ onClose }: { onClose: () => void }) => {
  return (
    <Stack spacing={4} direction="column" p={4} w="100%">
      <Header onClose={onClose} />
      <LocationSettings />
    </Stack>
  );
};

const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <Stack direction="row" spacing={4}>
      <Heading>Settings</Heading>
      <Spacer />
      <Tooltip label="Close" aria-label="Close" placement="left">
        <IconButton
          aria-label="Close"
          icon={<IoMdClose />}
          borderRadius="full"
          onClick={onClose}
        />
      </Tooltip>
    </Stack>
  );
};

const LocationSettings = () => {
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch<AppDispatch>();

  const [radiusMarkers, setRadiusMarkers] = useState<
    { position: number; value: number; label?: string }[]
  >([
    { position: 1, value: 5 },
    { position: 2, value: 10 },
    { position: 3, value: 20 },
    { position: 4, value: 50 },
    { position: 5, value: 100 },
    { position: 6, value: 100000, label: "everywhere" },
  ]);

  const updateRadius = (value: number) => {
    dispatch(locationActions.updateRadius(value));
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Stack direction="column" spacing={4}>
      <Heading size="md">Location</Heading>
      <Stack direction="row" spacing={4} w={"full"}>
        {/* <LocationInput
          label="Latitude"
          value={state.latitude.toString()}
          setValue={(value) => setState({ ...state, latitude: +value })}
        />

        <LocationInput
          label="Longitude"
          value={state.longitude.toString()}
          setValue={(value) => setState({ ...state, longitude: +value })}
        /> */}
      </Stack>

      <Stack direction="row" spacing={4}>
        <RadiusSlider
          label="Radius"
          value={location.radius}
          setValue={(value) => updateRadius(value)}
          markers={radiusMarkers}
        />
      </Stack>
    </Stack>
  );
};

const LocationInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <Stack direction="column" spacing={2} w="full">
      <Heading size="sm">{label}</Heading>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Stack>
  );
};

const RadiusSlider = ({
  markers,
  label,
  value,
  setValue,
}: {
  markers: { position: number; value: number; label?: string }[];
  label: string;
  value: number;
  setValue: (value: number) => void;
}) => {
  const findValue = (position: number) => {
    const marker = markers.find((marker) => marker.position === position);
    return marker?.value;
  };

  const findPosition = (value: number) => {
    const marker = markers.find((marker) => marker.value === value);
    return marker?.position;
  };

  const findLabel = (value: number) => {
    const marker = markers.find((marker) => marker.value === value);
    return marker?.label;
  };

  const [temp, setTemp] = useState(findPosition(value) || 0);

  return (
    <Stack direction="column" spacing={2} w="full">
      <Heading size="sm">{label}</Heading>
      <Slider
        aria-label="slider-ex-1"
        value={temp}
        onChange={(value) => setTemp(value)}
        onChangeEnd={(value) => setValue(findValue(value) || 0)}
        min={markers[0].position}
        max={markers[markers.length - 1].position}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />

        {markers.map((marker) => (
          <SliderMark
            key={marker.position}
            value={marker.position}
            mt={5}
            borderRadius="md"
            p={2}
            ml={-5}
          >
            {marker.label || marker.value}
          </SliderMark>
        ))}

        <SliderMark
          value={findPosition(value) || 0}
          mt={5}
          borderRadius="md"
          p={2}
          bg={useColorModeValue("gray.300", "gray.700")}
          ml={-5}
        >
          {findLabel(value) || value}
        </SliderMark>
      </Slider>
    </Stack>
  );
};

export default SettingsPopUp;
