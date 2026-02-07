import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { profileService } from "../../services/profileService";
import { preferencesService } from "../../services/preferencesService";

export default function SettingsView() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [preferenceData, setPreferenceData] = useState<{
    theme: "light" | "dark";
    language: string;
    notifications: boolean;
    emailDigest: boolean;
    timezone: string;
  }>({
    theme: "light",
    language: "en",
    notifications: true,
    emailDigest: true,
    timezone: "UTC",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const profileData = await profileService.getProfile();
      setProfileData({
        name: profileData.name,
        bio: profileData.bio || "",
        avatar: profileData.avatar || "",
      });

      const prefsData = await preferencesService.getPreferences();
      if (prefsData) {
        setPreferenceData({
          theme: prefsData.theme as "light" | "dark",
          language: prefsData.language,
          notifications: prefsData.notifications,
          emailDigest: prefsData.emailDigest,
          timezone: prefsData.timezone,
        });
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await profileService.updateProfile(profileData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleUpdatePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await preferencesService.updatePreferences(preferenceData);
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold">Settings</h2>

      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-bold">Profile</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <Textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
              placeholder="Tell us about yourself"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avatar URL</label>
            <Input
              value={profileData.avatar}
              onChange={(e) =>
                setProfileData({ ...profileData, avatar: e.target.value })
              }
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-bold">Preferences</h3>
        <form onSubmit={handleUpdatePreferences} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Theme</label>
              <Select
                value={preferenceData.theme}
                onChange={(e) =>
                  setPreferenceData({
                    ...preferenceData,
                    theme: e.target.value as "light" | "dark",
                  })
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <Select
                value={preferenceData.language}
                onChange={(e) =>
                  setPreferenceData({
                    ...preferenceData,
                    language: e.target.value,
                  })
                }
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Timezone</label>
              <Select
                value={preferenceData.timezone}
                onChange={(e) =>
                  setPreferenceData({
                    ...preferenceData,
                    timezone: e.target.value,
                  })
                }
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="CST">CST</option>
                <option value="MST">MST</option>
                <option value="PST">PST</option>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferenceData.notifications}
                onChange={(e) =>
                  setPreferenceData({
                    ...preferenceData,
                    notifications: e.target.checked,
                  })
                }
              />
              <span className="text-sm font-medium">Enable notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferenceData.emailDigest}
                onChange={(e) =>
                  setPreferenceData({
                    ...preferenceData,
                    emailDigest: e.target.checked,
                  })
                }
              />
              <span className="text-sm font-medium">Email digest</span>
            </label>
          </div>
          <Button type="submit">Save Preferences</Button>
        </form>
      </Card>
    </div>
  );
}
