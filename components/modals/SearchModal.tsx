"use client";

import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import qs from "query-string";
import { formatISO } from "date-fns";
import { onClickSearchModalClose } from "@/redux/modalSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/ui/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import useCountries from "@/hooks/useCountries";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
import Counter from "@/components/Counter";

// !! Form Schema
const formSchema = z.object({
  location: z.object({
    value: z.string(),
    label: z.string(),
    flag: z.string(),
    latlng: z.number(),
    region: z.string(),
  }),
  guestCount: z.number({
    required_error: "This field is required",
  }),
  roomCount: z.number({
    required_error: "This field is required",
  }),
  bathroomCount: z.number({
    required_error: "This field is required",
  }),
  dateRange: z.object({
    startDate: z.date(),
    endDate: z.date(),
    key: z.string(),
  }),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useDispatch();
  const { getAll, getByValue } = useCountries();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.LOCATION);

  // ** Import Map
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    []
  );

  // ** Handle Back
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  // ** Handle Next
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // ** Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: {
        value: "",
        label: "",
        flag: "",
        latlng: 0,
        region: "",
      },
      guestCount: 0,
      roomCount: 0,
      bathroomCount: 0,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    },
  });

  const location = form.watch("location");
  const guestCount = form.watch("guestCount");
  const roomCount = form.watch("roomCount");
  const bathroomCount = form.watch("bathroomCount");
  const dateRange = form.watch("dateRange");

  // ** Form Submission
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    // !!Final URL
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    form.reset();
    dispatch(onClickSearchModalClose());
    router.push(url);
  }, [
    step,
    onNext,
    params,
    location?.value,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange.startDate,
    dateRange.endDate,
    form,
    dispatch,
    router,
  ]);

  // ** Labels
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";

    return "Next";
  }, [step]);

  //const secondaryActionLabel = useMemo(() => {
  //  if (step === STEPS.LOCATION) return undefined;
  //
  //  return "Back";
  //}, [step]);

  // !! Body Content
  let bodyContent = (
    <div>
      <FormField
        control={form.control}
        name="location.value"
        render={({ field }) => (
          <FormItem>
            <Heading
              title="Where do you wanna go?"
              subtitle="Find the perfect location!"
            />

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {getAll().map((item, index) => (
                  <SelectItem
                    key={index}
                    className="w-full flex items-center cursor-pointer "
                    value={item.value}
                  >
                    <span className="mr-2">{item.flag}</span> {item.label},{" "}
                    <span className="text-muted-foreground">{item.region}</span>
                  </SelectItem>
                ))}
              </SelectContent>
              <Map center={getByValue(location.value)?.latlng} />
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <FormField
        control={form.control}
        name="dateRange"
        render={({ field }) => (
          <FormItem>
            <Heading
              title="When do you plan to go?"
              subtitle="Make sure everyone is free!"
            />

            <FormControl>
              <Calendar
                value={field.value}
                onChange={(value) =>
                  form.setValue("dateRange", value.selection)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div>
        <Heading title="More information" subtitle="Find your perfect place!" />

        <div>
          <FormField
            control={form.control}
            name="guestCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Guests"
                    subtitle="How many guests are comming?"
                    value={guestCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="roomCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem className="pb-4">
                <FormControl>
                  <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      description="Find a listed home based on your what you're looking for"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {bodyContent}

          <div className="flex items-center gap-x-2 pt-2">
            {step > 0 && (
              <Button
                variant="secondary"
                className="w-full font-bold"
                disabled={isLoading}
                type="button"
                onClick={onBack}
              >
                Back
              </Button>
            )}
            {actionLabel === "Next" && (
              <Button
                variant="default"
                className="w-full font-bold"
                disabled={isLoading}
                type="button"
                onClick={onNext}
              >
                Next
              </Button>
            )}
            {actionLabel === "Search" && (
              <Button
                variant="default"
                className="w-full font-bold"
                disabled={isLoading}
                type="submit"
              >
                Search
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Modal>
  );
}
