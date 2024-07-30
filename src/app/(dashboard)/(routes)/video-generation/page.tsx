"use client";

import { useState } from "react";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoGeneration = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);
      form.reset();
    }  catch (error: any) {
      if(error?.response?.status === 429) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <>
      <div>
        <Heading
          title="Video Generation"
          description="Generate Video based on a prompt."
          icon={Video}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />
        <div className="px-4 lg:px-8">
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 lg:px-8 focus-within:shadow-sm flex gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Generate Videos "
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-1/4" disabled={isLoading}>
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 flex flex-col justify-center items-center">
          {isLoading && (
            <div className="p-9 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && <Empty label="No Video Generated" />}
          {video && (
            <video controls className=" w-3/5 aspect-video rounded-lg border bg-black px-12 mt-8">
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </>
  );
};
export default VideoGeneration;
